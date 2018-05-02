import './style.styl';

var defPhoto = require('./assets/profile-test-photo.png');

export default {
    template: require('./template.pug')(),
    data() {
        return {
            emptyCharacter: {
                photo: defPhoto,
                money: 0,
                reputation: 0
            },
            character: null,

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
            if (!this.modalCharacter.data.name) {
                this.modalCharacter.data = {
                    server: 0,
                    name: this.$root.user.username,
                };
            }
        },
        modalCharacterShown() {
            console.log('qweqe', $('.sky-modal input[name="name"]')[0]);
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
                    // return $.post(config.api+'/character/add', this.modalCharacter.data)
                })
                .then((res) => {
                    console.log('Created', res, this.modalCharacter.data);
                })
                .catch((res) => {
                    if (!res) return res;

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
        this.selectCharacter(user.characters[0]);
    }
};
