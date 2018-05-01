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
                opened: false,
                data: {},
                status: null,
                valid: {},
                messages: []
            }
        }
    },
    computed: {

    },
    methods: {
        selectCharacter(char) {
            // if (!char) return;
            this.character = char || this.emptyCharacter;
            if (!this.character.photo) this.character.photo = defPhoto;
        },
        createCharacterModal() {
            this.modalCharacter.opened = true;
            if (!this.modalCharacter.data.name) {
                this.modalCharacter.data = {
                    server: 0,
                    name: this.$root.user.username,
                };
            }
        },
        createCharacter(e) {
            console.log(e);

            console.log('Create character', this.modalCharacter.data);

        },

        // create modal
        flushError() {

        }
    },
    created() {
        var user = this.$root.user;
        this.selectCharacter(user.characters[0]);
    }
};
