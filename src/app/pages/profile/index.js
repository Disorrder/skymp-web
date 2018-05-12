import './style.styl';

var photoTest = require('./assets/profile-photo-test.png');
var photoEmpty = require('./assets/profile-photo-empty.png');

const races = ["Имперец", ""];
const classes = ["Воин", ""];

export default {
    template: require('./template.pug')(),
    data() {
        return {
            emptyCharacter: {
                photo: photoEmpty,
                money: 0,
                reputation: 0
            },
            character: null,

            inviteCode: null,

            // character creation modal
            characterData: {},
            modalCharacter: {
                opened: false,
                disabled: false,
                data: {
                    name: null,
                    server: null
                },
            },

            // Admin panel
            admin: {
                generatedInvite: null,
            }
        }
    },
    computed: {
        user() { return this.$store.state.user; },
        characters() { return this.$store.state.characters; },
        serverList() { return this.$store.state.servers; },

        correctName() {
            if (this.errors.has('name')) return;
            var str = this.modalCharacter.data.name;
            if (!str) return;

            let is2UP = str.length === 2 && str === str.toUpperCase();
            if (is2UP) return str; // easter egg by LEO

            str = str.toLowerCase().replace(/ [a-z]/, (match) => match.toUpperCase()); // capitalize after space
            str = str[0].toUpperCase() + str.substr(1); // capitalize
            return str;
        }
    },
    filters: {
        date(val) {
            var d = new Date(val);
            return `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`;
        },
        race(val = 0) { return races[val]; },
        class(val = 0) { return classes[val]; },
    },
    methods: {
        selectCharacter(char) {
            this.character = char || this.emptyCharacter;
            if (!this.character.photo) this.character.photo = photoTest;
        },

        modalCharacterOpen() {
            var data = this.modalCharacter.data;
            if (!data.name) data.name = this.$store.state.user.username;
            if (!data.server && this.serverList[0]) data.server = this.serverList[0]._id;
            this.modalCharacter.opened = true;
        },
        modalCharacterShown() {
            $('.sky-modal input[name="name"]')[0].focus();
        },

        createCharacter() {
            if (this.modalCharacter.disabled) return;
            this.modalCharacter.disabled = true;
            this.flushErrors();

            this.$validator.validateAll()
                .then((res) => {
                    if (!res) throw res;
                    this.modalCharacter.data.name = this.correctName;
                    return $.post(config.api+'/character/add', this.modalCharacter.data)
                })
                .then((res) => {
                    this.characters.push(res);
                    this.modalCharacter.opened = false;
                })
                .catch((res) => {
                    if (!res) return res;
                    if (res.responseText === 'ERR_DUPLICATE_CHARACTER') {
                        this.errors.add({field: 'name', rule: 'unique', msg: true});
                    }
                })
                .finally((res) => {
                    this.modalCharacter.disabled = false;
                })
            ;
        },

        activateInvite() {
            this.flushErrors('invite');
            $.get(config.api+'/invite/activate/'+this.inviteCode)
                .then((res) => {
                    this.$store.dispatch('updateUser');
                    this.$store.dispatch('updateServers');
                })
                .catch((res) => {
                    switch (res.responseText) {
                        case 'Not Found': return this.errors.add({field: 'invite', rule: 'incorrect', msg: true});
                        case 'ERR_CODE_ACTIVATED': return this.errors.add({field: 'invite', rule: 'activated', msg: true});
                        case 'ERR_ALREADY_TESTER': return this.errors.add({field: 'invite', rule: 'tester', msg: true});
                        default: this.$notify({type: 'error', title: 'ERROR', text: `${res.status}: ${res.responseText}`});
                    }
                })
            ;
        },

        // create modal
        flushErrors(selector) {
            if (!selector) return this.errors.clear();

            let [field, rule] = selector.split(':');
            this.errors.items = this.errors.items.filter((v) => {
                if (field && !rule) return !(v.field === field);
                if (!field && rule) return !(v.rule === rule);
                return !(v.field === field && v.rule === rule);
            });
        },

        logout() {
            this.$store.dispatch('logout').then(() => {
                this.$router.push({name: 'login'});
                this.$notify({ title: "Счастливо!" });
            });
        },

        notifySoon() {
            this.$notify({ title: "Скоро!" });
        },

        // Admin panel
        generateInvite() {
            $.get(config.api+'/invite/generate').then((code) => {
                this.admin.generatedInvite = code;
            });
        }
    },
    created() {
        Promise.all([
            this.$store.dispatch('updateCharacters'),
            this.$store.dispatch('updateServers'),
        ]).then((res) => {
            this.selectCharacter(this.characters[0]);
            if (!this.characters.length && this.serverList.length) this.modalCharacterOpen();
        });
    }
};
