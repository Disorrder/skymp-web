import './style.styl';

var defPhoto = require('./assets/profile-test-photo.png');

export default {
    template: require('./template.pug')(),
    data() {
        return {
            characters: [],
            emptyCharacter: {
                photo: defPhoto,
                money: 0,
                reputation: 0
            },
            character: null,

            serverList: [],

            // character creation modal
            modalCharacter: {
                opened: !false,
                disabled: false,
                data: {},
            }
        }
    },
    computed: {
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
    methods: {
        selectCharacter(char) {
            // if (!char) return;
            this.character = char || this.emptyCharacter;
            if (!this.character.photo) this.character.photo = defPhoto;
        },

        modalCharacterOpen() {
            this.modalCharacter.opened = true;
            var data = this.modalCharacter.data;
            if (!data.name) data.name = this.$root.user.username;
            if (!data.server && this.serverList[0]) data.server = this.serverList[0]._id;
            console.log(data.server, this.serverList.length);
            console.log(this.serverList[0]._id);
        },
        modalCharacterShown() {
            $('.sky-modal input[name="name"]')[0].focus();
        },

        createCharacter() {
            if (this.modalCharacter.disabled) return;
            this.modalCharacter.disabled = true;
            console.log('Create character', this.modalCharacter.data);
            this.flushErrors();

            this.$validator.validateAll()
                .then((res) => {
                    if (!res) throw res;
                    this.modalCharacter.data.name = this.correctName;
                    return $.post(config.api+'/character/add', this.modalCharacter.data)
                })
                .then((res) => {
                    console.log('Created', res, this.modalCharacter.data);
                    this.$root.user.characters.push(res);
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

        // create modal
        flushErrors(selector) {
            if (!selector) return this.errors.clear();

            let [field, rule] = selector.split(':');
            this.errors.items = this.errors.items.filter((v) => {
                if (field && !rule) return !(v.field === field);
                if (!field && rule) return !(v.rule === rule);
                return !(v.field === field && v.rule === rule);
            });
        }
    },
    created() {
        var user = this.$root.user;
        console.log('usr', user.characters);
        this.selectCharacter(user.characters[0]);

        $.get(config.api+'/server').then((res) => {
            this.serverList = res;
            if (!user.characters.length) this.modalCharacterOpen();
            console.log('srv', res);
            this.modalCharacterOpen();
        });
    }
};
