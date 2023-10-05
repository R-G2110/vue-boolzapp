const {createApp} = Vue;
import { contacts } from "./db.js";
const dt = luxon.DateTime;
createApp({
	data(){
		return {
			contacts,
			index: 0,
			activeContact: {},
			searchString: '',
			contactFound: {},
			newMessageString: '',
			
		}
	},
	methods: {
		sendNewMessage(){

			setTimeout(() => {
				this.activeContact.messages.push(this.generateMessage(this.newMessageString, 'sent'));
				this.newMessageString = ''
			},200)

			setTimeout(() => {
				this.activeContact.messages.push(this.generateMessage('Ricevuto!', 'received'));
			},1500)
		},

		generateMessage(message, status){
			return {
				date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
				message,
				status
			}
		},

		getLastMessage(contact){
			return contact.messages.at(-1).message;
		},

		getLastDate(contact){
			return contact.messages.at(-1).date;
		},

		removeMessage(index) {
			this.activeContact.messages.splice(index, 1).message
			if(this.activeContact.messages.length === 0) this.activeContact.messages = ''
		}
	},
	computed: {
		resultQuery(){
      if(this.searchString){
      return this.contacts.filter((contact)=>{
        return this.contactFound.toLowerCase().split(' ').every(contact => contacts.name.toLowerCase().includes(this.searchString))
      })
      }else{
        return this.contactFound;
      }
    }
	},
	created() {
		this.activeContact = this.contacts[0]
	},
	mounted() {
		console.log('contacts: '+this.contacts);
	}
}).mount('#app');