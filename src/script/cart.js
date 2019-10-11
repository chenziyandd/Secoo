class cart {
    constructor() {
        this.chooseAll = $("#choseAll");
        this.choose = $(".cartListMain table tbody input");
    }
    init(){
        this.selector();
        //this.render();
        // this.amountChange();
    }
    selector() {//全选
        let _this = this;
        this.chooseAll.on("click", function () {
            if ($(this).prop("checked")) {
                _this.choose.prop("checked", true);
            } else {
                _this.choose.prop("checked", false);
            }
        })
        this.choose.on("click", function () {
            let alreadyChoose = $(".cartListMain table tbody input:checked");
            if (alreadyChoose.length == _this.choose.length) {
                _this.chooseAll.prop("checked", true);
            }else{
                _this.chooseAll.prop("checked", false);
            }
        })
    }
}
$('#Header').load('indexheader.html');
$('#loginFooter').load('footer.html');
new cart().init();
