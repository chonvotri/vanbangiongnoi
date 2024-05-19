$(function() {
    Wstoast.config({autoClose:true,showClose:true,html:true})
    new Vue({
        el: '#app',
        data: {
            set: {
                input: 'Trên núi có cây, cây có nhánh, lòng anh tương tư, người không hay.',
                rate: 1,
                pitch: 1,
                voice: 1,
                voices: [],
            },
            synth: null,
        },
        created() {
            if (window.speechSynthesis === undefined) {
               Wstoast.error('Trình duyệt không hỗ trợ giọng nói!');
                return
            }
            this.synth = window.speechSynthesis
            window.speechSynthesis.onvoiceschanged = e => {
                this.set.voices = window.speechSynthesis.getVoices();
                this.set.voice = this.set.voices[0].name
            }
        },
        methods: {
            play() {
                try{
                    const utterThis = new SpeechSynthesisUtterance(this.set.input);
                    this.set.voices.forEach(value => {
                        if (this.set.voice === value.name) {
                            Wstoast.success('Đã phát voice!');
                            utterThis.voice = value;
                        }
                    })
                    utterThis.pitch = this.set.pitch;
                    utterThis.rate = this.set.rate;
                    this.synth.cancel()
                    this.synth.speak(utterThis);
                }catch (e) {
                    Wstoast.error(e.message)
                }
            },
            reset() {
                Wstoast.success('Đã làm trống nội dung')
                this.set.input = ''
            },
            cancel() {
                Wstoast.success('Đã dừng phát voice');
                this.synth.cancel()
            }
        },
    })

});