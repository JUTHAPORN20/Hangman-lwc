import { LightningElement, api, track } from 'lwc';

export default class Hangman extends LightningElement {
    // var
    @track lives = 10;
    @track result = '';
    @track disabledCondition = false; // Default disable button
    getAlphabet; // Get lable wheen clicked

    Alphabet  = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // All list Question
    word = [["Hangman", "That game you are playing right now."], 
    ["Thomas Hj", "About the creator of this game."], 
    ["HTML", "Markup language for creating Web pages."], 
    ["CSS", "Wep page styles"], 
    ["PHP", "A very popular server scripting language."], 
    ["JavaScript", "Make web-page dynamic without reload the web page."], 
    ["Java", "Run 15 billion devices.\nA program can be run in Windows, Linux and Mac"], 
    ["SoloLearn", "A company that everyone can code for fun and share."], 
    ["Love", "What is ?\nBaby don't hurt me\nDon't hurt me\nNo more"], 
    ["Document", "A lot of text in the a file."], ["Playground", "There school kids go to."], 
    ["Run", "Usain bolt."], ["Code", "var hw = 'Hello World';"], 
    ["Samsung", "A company create Phone, Tv, Monitor, SDD, Memory chip..."], 
    ["Super Mario", "A very popular game in Nintendo 64 that have red hat."], 
    ["Star", "Super Mario like to get."], ["Clock", "14:12 or 14pm"], 
    ["Binary Clock", "A clock that only use 0 or 1."], 
    ["Sword", "Link from Zelda have on the hand."], 
    ["Girl", "Not boy but ?"], ["Boy", "Not girl but ?"], 
    ["Female", "Other name as girl."], ["Male", "Other name as boy."], 
    ["Smartphone", "Something you've always on you."]];

    // Get question 
    index = Math.floor(Math.random() * this.word.length);
    hint = this.word[this.index][1];
    real_ans = this.word[this.index][0];

    @track letter = this.real_ans.length;

    // Create array -> Get lale or upperAns when you clicked
    msglist = Array(this.real_ans.length);

    // click btn
    handleClick(event) {
        var upperAns = this.real_ans.toUpperCase().split(''); // upper letter list type
        this.getAlphabet = event.target.label; //Get value

        // For loop and check
        if (upperAns.includes(this.getAlphabet)) {
            for (const i in upperAns) {
                if (upperAns[i] == this.getAlphabet){
                    /* if {this.getAlphabet} equal {upperAns}
                        push value in {this.msglist}
                    */
                    this.msglist[i] = upperAns[i];
                }
            }    
            this.result = this.msglist.join(''); // Set to string
        }
        else {
            // clicked wrong decrement lives point
            this.lives--;
        }
        //console.log(event.target.label, event.target.disabled);

        // Set disabled button
        if (event.target.label || !event.target.disabled){
            event.target.disabled = 'true';
        }
    }
    
    // Show result
    @track wincheck = false;
    @track show = false;
    @track reward;
    get rewardFunction() {
        var myAns = this.result
        var yourAns = this.real_ans.toUpperCase().split('').join('');
        //console.log(myAns , yourAns, (myAns == yourAns) );
        if (myAns == yourAns) {
            this.show = false;
            this.wincheck = true;
            this.reward = 'YOU WIN';
            return this.show;
        }
        else if (this.lives <= 0)
        {
            this.show = true;
            this.reward = 'YOU LOSE';
            return this.show;
        } 
    }

    // play again
    handlePlayagain() {
        location.reload();

     }
}   