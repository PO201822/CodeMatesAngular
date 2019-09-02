export class MessageService {
    public isMessageShown: boolean = false;
    private message : string = '';
    private type : string = '';

    hideMessage(){
        this.isMessageShown = false;
    }

    showMessage(message, type){
        this.isMessageShown = true;
        this.message = message;
        this.type = type;
    }

}