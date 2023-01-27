declare const IGS:any;

export class JustePrix {

    private value: number;

    constructor() {
        this.value = Math.floor(Math.random() * 1000);
    }

    try(num: number) {
        const diff = this.value - num;
        let res: string;
        if (diff == 0) {
            res = "EEEEEt c'est gg gros bg!";
        } else if (diff > 0) {
            res = "C'est plus";
        } else {
            res = "C'est moins";
        }

        return res;
    }

}