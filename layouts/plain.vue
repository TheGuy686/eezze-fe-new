<template>
<div>
	<Nuxt />
</div>
</template>

<script>
// Create a new instance of SpeechSynthesisUtterance
const utterance = new SpeechSynthesisUtterance();

export default {
	head() {
		return {
			...this.getHead(),
		};
	},
	mounted() {
		this.$store.commit('app/setSeshionId', this.generateRandomString(30));

		this.events.on('member-handle-clicked', (text) => this.say(text));
		this.events.on('say', (text) => this.say(text));
		this.events.on('stop-speaking', () => this.stopSpeaking());
	},
	data() {
		return {
			synth: window.speechSynthesis,
			currentSpeech: null,
		};
	},
	methods: {
		say(text) {
			return;
			// // Create a new instance of SpeechSynthesisUtterance
			// const utterance = new SpeechSynthesisUtterance();

			// store the instance to be canceled later if needed
			this.currentSpeech = utterance;

			// Set the text to be spoken
			utterance.text = text;

			// Use the default voice
			utterance.voice = speechSynthesis.getVoices()[1];

			// Speak the text
			speechSynthesis.speak(utterance);

			speechSynthesis.onerror = (event) => {
				console.error('Speech synthesis error:', event.error);
			};

			utterance.onend = () => {
				this.currentSpeech = null;
			};
		},
		stopSpeaking() {
			if (this.currentSpeech) {
				this.synth.cancel();
			}
		},
	}
}
</script>

