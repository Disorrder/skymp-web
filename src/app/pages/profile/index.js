import './style.styl';

var defPhoto = require('./assets/profile-test-photo.png');

export default {
    template: require('./template.pug')(),
    data() {
        return {
            fakeCharacter: {
                photo: defPhoto,
                money: 0,
                reputation: 0
            },
            character: null,
            // create modal
            characterData: {},
            status: null,
            valid: {},
            messages: []
        }
    },
    computed: {

    },
    methods: {
        selectCharacter(char) {
            // if (!char) return;
            this.character = char || this.fakeCharacter;
            if (!this.character.photo) this.character.photo = defPhoto;
        },
        createCharacterModal() {
            $('#createCharacter').modal();
            if (!this.characterData.name) {
                this.characterData = {
                    server: 0,
                    name: this.$root.user.username,
                    race: 'human',
                    class: 'warrior'
                };
            }
        },
        createCharacter(e) {
            console.log(e);

            console.log('Create character', this.characterData);

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
