class DraggableObject {
    SetDraggable(NewObj) {
        NewObj.classList.add("Draggable");
        NewObj.style.position = "absolute";
        NewObj.addEventListener("mousedown", (e) => {
            moveable.target = NewObj;
            e.stopPropagation();
        });
    }
    Append(NewObj) {
        StorySpace.appendChild(NewObj);
    }


}
class PicObject extends DraggableObject {

    constructor(URL, width, height, index) {
        super(URL);
        this.src = URL;
        this.Type = "Picture";
        this.Height = Math.min(width, 540) / width * height;
        this.Width = Math.min(width, 540);
        this.Index = index;
        this.ZIndex = 500;
        this.x = 0;
        this.y = 0;
        this.NewCont = document.createElement("div");
        this.NewObj = document.createElement("img");
    }
    SetContCSS() {
        this.NewCont.style.zIndex = this.ZIndex;
        this.NewCont.style.height = this.Height + "px";
        this.NewCont.style.width = this.Width + "px";
        this.NewCont.style.cursor = "move";
    }
    SetObjCSS() {
        this.NewObj.src = this.src;
        this.NewObj.style.height = "100%";
        this.NewObj.style.width = "100%";
    }
    
    /*
    ChangeZIndex(){
        this.ZIndex = zIndex;
    }
    UpdateZindex(){
        this.NewCont.style.zIndex = this.ZIndex;
        zIndex++;
    }
    */

    CreateNewObject() {
        this.SetContCSS();
        this.SetObjCSS();
        this.NewCont.appendChild(this.NewObj);
        super.SetDraggable(this.NewCont);
        super.Append(this.NewCont);


        this.NewCont.addEventListener("mousedown", (e)=>{
            DraggableOnFocus = DraggableObjects.indexOf(this);
            console.log(DraggableOnFocus);
        })
    }


}
class TextObject extends DraggableObject {

    constructor(index) {
        super();
        this.Type = "Text";
        this.Index = index;
        this.ZIndex = 501;
        this.FontSize = 18;
        this.isBold = false;
        this.isItalic = false;
        this.isStrikeThrough = false;
        this.isUnderLine = false;
        this.Color = "#000000";
        this.NewCont = document.createElement("div");
        this.NewTextArea = document.createElement("textarea");
    }

    ChangeSize(size) {
        // change member data
        this.FontSize = size;
        this.UpdateFontSize();
        this.DisplayFontSize();
    }
    UpdateFontSize() {
        // update style in textarea
        this.NewTextArea.style.fontSize = this.FontSize + "px";
    }
    DisplayFontSize() {
        // display font size in aside
        const NumberForm = document.querySelector(".NumberForm");
        NumberForm.value = this.FontSize;
    }

    ChangeEffect(Effect) {
        // change all effects according to member onclick event
        switch (true) {
            case Effect === "Bold":
                this.isBold = !this.isBold;
                break;
            case Effect === "Italic":
                this.isItalic = !this.isItalic;
                break;
            case Effect === "StrikeThrough":
                this.isStrikeThrough = !this.isStrikeThrough;
                break;
            case Effect === "UnderLine":
                this.isUnderLine = !this.isUnderLine;
                break;
            default:
                console.log("Error Occured when changing Features!")
        }
        this.UpdateEffects();
        this.DisplayEffects();
    }
    UpdateEffects() {
        //  update effets in textarea
        let BoldSetting, ItalicSetting, StrikeThroughSetting, UnderLineSetting;
        if (this.isBold) BoldSetting = "bold";
        else BoldSetting = "lighter";

        if (this.isItalic) ItalicSetting = "italic";
        else ItalicSetting = "normal";

        if (this.isStrikeThrough) StrikeThroughSetting = "line-through";
        else StrikeThroughSetting = "";

        if (this.isUnderLine) UnderLineSetting = "underline";
        else UnderLineSetting = "";

        if (!this.isStrikeThrough && !this.isUnderLine) StrikeThroughSetting = "none";

        this.NewTextArea.style.fontWeight = BoldSetting;
        this.NewTextArea.style.fontStyle = ItalicSetting;
        this.NewTextArea.style.textDecoration = StrikeThroughSetting + " " + UnderLineSetting;
    }
    DisplayEffects() {
        // display text effect in aside
        const Bold = document.querySelector("#Bold"),
            Italic = document.querySelector("#Italic"),
            StrikeThrough = document.querySelector("#StrikeThrough"),
            UnderLine = document.querySelector("#UnderLine"),
            Status = [this.isBold, this.isItalic, this.isStrikeThrough, this.isUnderLine],
            Settings = [Bold, Italic, StrikeThrough, UnderLine];

        for (let i = 0; i < 4; i++) {
            if (Status[i]) {
                Settings[i].checked = true;
            } else {
                Settings[i].checked = false;
            }
        }
    }
    ChangeColor(color) {
        this.Color = color;
        this.UpdateColor();
        this.DisplayColor();
    }
    UpdateColor() {

        // update color inside textarea and adjust placeholder color
        this.NewTextArea.style.color = this.Color;
        document.querySelector(".ColorFont").style.color = this.Color;
        var sheets = document.styleSheets
        var sheet = sheets[sheets.length - 1];

        //スタイルルールの追加
        sheet.insertRule(
            '.Draggable:nth-child(' + this.Index + 1 + ') textarea::placeholder { color: ' + this.Color + ' }',
            sheet.cssRules.length
        );

    }
    DisplayColor() {
        const ColorForm = document.querySelector("#ColorForm");
        ColorForm.value = this.Color;
    }
    /*
    ChangeZIndex(){
        this.ZIndex = zIndex;
    }
    UpdateZindex(){
        this.NewCont.style.zIndex = this.ZIndex;
        zIndex++;
    }
    */


    SetContCSS() {
        this.NewCont.style.top = ""
        this.NewCont.style.border = "4px solid transparent";
        this.NewCont.style.zIndex = this.ZIndex;
        this.NewCont.style.maxWidth = "540px";
        this.NewCont.style.height = "40px";
        this.NewCont.style.cursor = "move";
        this.NewCont.style.backgroundColor = "transparent";
        this.NewCont.tabIndex = "0";
    }
    SetTextAreaCSS() {
        this.NewTextArea.style.maxWidth = "532px"
        this.NewTextArea.style.width = "100%";
        this.NewTextArea.style.height = "100%";
        this.NewTextArea.style.backgroundColor = "transparent";
        this.NewTextArea.style.fontSize = this.FontSize + "px";
        this.NewTextArea.placeholder = "ここにテキストを入力";
    }
    SetFocus() {
        this.DisplayEffects();
        this.DisplayFontSize();
        this.DisplayColor();
    }

    CreateNewObject() {
        this.SetContCSS();
        this.SetTextAreaCSS();
        super.SetDraggable(this.NewCont, this.Index);
        this.NewCont.addEventListener("mousedown", (e) => {
            this.SetFocus();
        })
        this.NewTextArea.addEventListener("mousedown", (e) => {
            this.SetFocus();
        })
        
        this.NewTextArea.addEventListener("input", () => {
            this.NewCont.style.height = "auto";
            this.NewCont.style.height = `calc( ${this.NewTextArea.scrollHeight}px + 8px)`;
        })
        window.addEventListener("mousemove", () => {
            this.NewCont.style.height = "auto";
            this.NewCont.style.height = `calc( ${this.NewTextArea.scrollHeight}px + 8px)`;
        })
        this.NewCont.appendChild(this.NewTextArea);
        super.Append(this.NewCont);

        
        this.NewCont.addEventListener("mousedown", (e)=>{
            DraggableOnFocus = DraggableObjects.indexOf(this);
            console.log(DraggableOnFocus);
        })


        this.SetFocus();
    }
}





let DraggableObjects = [];
let DraggableOnFocus;
let TextSettingScreenShown = false;

let PressShiftKey = false;

const Draggables = document.getElementsByClassName("Draggable");

const PicAssets = new PicObject();

const StorySpace = document.querySelector(".StorySpace");
const EditScreen = document.querySelector(".EditScreen");
const Toolbar = document.querySelector(".Toolbar");

const UploadPic = document.querySelector(".UploadPic");
const AddPicBtn = document.querySelector("#AddPicBtn");
const AddTextBtn = document.querySelector("#AddTextBtn");



// onInput userInput
const UserInputFileName = document.querySelector(".UserInputFileName");
UserInputFileName.addEventListener("input", (e) => {
    UserInputFileName.style.width = 0;
    UserInputFileName.style.width = `calc( ${UserInputFileName.scrollWidth}px + 4px)`;
})
UserInputFileName.addEventListener("focusout", (e) => {
    if (UserInputFileName.value === "") UserInputFileName.style.width = 80 + "px";
})


// detect shiftKey pressing
window.addEventListener("keydown", (e) => {
    if (e.shiftKey) {
        PressShiftKey = true;
    } else {
        PressShiftKey = false;
    }
})
window.addEventListener("keyup", (e) => {
    PressShiftKey = false;
})


// reset onfocus
EditScreen.addEventListener("mousedown", ()=>{
    DraggableOnFocus = "null";
    console.log(DraggableOnFocus);
})


// MoveableLibSetting
const moveable = new Moveable(StorySpace, {
    origin: false,
    useResizeObserver: true,
    draggable: true,
    resizable: true,
    rotatable: true,
})
function SetMoveableDrag() {
    moveable.on("drag", ({ target, transform }) => {
        target.style.transform = transform;
    })
    moveable.on("rotate", ({ target, transform }) => {
        target.style.transform = transform
    });
}
function SetMoveableResize() {

    // resize pic
    let frame = {
        translate: [0, 0],
    };

    moveable.on("resizeStart", e => {
        moveable.keepRatio = PressShiftKey;
        e.setOrigin(["%", "%"]);
        e.dragStart && e.dragStart.set(frame.translate);
    }).on("resize", e => {
        const beforeTranslate = e.drag.beforeTranslate;

        frame.translate = beforeTranslate;
        e.target.style.width = `${e.width}px`;
        e.target.style.height = `${e.height}px`;
        e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;


    });
}
function SetMoveableFocusOut() {
    EditScreen.addEventListener("mousedown", () => {
        moveable.target = "";
    })
    StorySpace.addEventListener("mousedown", () => {
        moveable.target = "";
    })
}
SetMoveableDrag();
SetMoveableResize();
SetMoveableFocusOut();



// Picture Event

// uplad picture
AddPicBtn.addEventListener("click", () => {
    UploadPic.click();
})
// add new Picture Object
function AddPic(e) {
    var fileReader = new FileReader();
    fileReader.onload = (function () {
        image = new Image();
        image.src = URL.createObjectURL(e.files[0]);

        image.onload = () => {
            let NewClass = new PicObject(fileReader.result, image.naturalWidth, image.naturalHeight, DraggableObjects.length);
            NewClass.CreateNewObject();
        }
    });
    fileReader.readAsDataURL(e.files[0]);
}


// Text Event

// add new Txt Object
AddTextBtn.addEventListener("click", () => {
    let NewClass = new TextObject(DraggableObjects.length);
    DraggableOnFocus = DraggableObjects.length;
    DraggableObjects.push(NewClass);
    NewClass.CreateNewObject();
})



function CheckType(OnFocusIndex) {
    if (DraggableOnFocus !== "null") {
        if (DraggableObjects[OnFocusIndex].Type === "Text") {
            return "Text";
        } else {
            return "Picture";
        }
    }
}
// text effect event
function ChangeTextEffects(effect) {
    if (CheckType(DraggableOnFocus) === "Text") {
        DraggableObjects[DraggableOnFocus].ChangeEffect(effect);
    }
}
// font size event
function ChangeFontSize(size) {
    if (size !== "" && CheckType(DraggableOnFocus) === "Text") {
        DraggableObjects[DraggableOnFocus].ChangeSize(size);
    }
}
// text color event
function ChangeTextColor(color) {
    console.log("changed", DraggableOnFocus);
    if (color !== "null" && CheckType(DraggableOnFocus) === "Text") {
        DraggableObjects[DraggableOnFocus].ChangeColor(color);
    }
}


function FetchFileName() {
    return UserInputFileName.value !== "" ? UserInputFileName.value : "Story.png";
}
// download canvas
const DownloadBtn = document.querySelector("#DownloadBtn");

DownloadBtn.addEventListener("click", () => {

    EditScreen.classList.toggle("onSave");
    
    html2canvas(StorySpace, {
        windowHeight: StorySpace.scrollHeight,
    }).then(canvas => {
        
        let downloadEle = document.createElement("a");
        downloadEle.href = canvas.toDataURL("image/png");
        downloadEle.download = "canvas.png";
        downloadEle.click();

    })
    EditScreen.classList.toggle("onSave");

})

/*

    // canvas element
    for (let i = 0; i < 10; i++) {
        html2canvas(StorySpace, {
            windowHeight: StorySpace.scrollHeight,
        }).then(canvas => {
            gif.addFrame(canvas, {copy: true, delay: 250 });
            /*
            let downloadEle = document.createElement("a");
            downloadEle.href = canvas.toDataURL("image/gif");
            downloadEle.download = "canvas.png";
            downloadEle.click();
        });
        if(i == 9){
            gif.render();
            gif.on('finished', function (blob) {
                window.open(URL.createObjectURL(blob));
            });
        }
    }
*/




/*
To Do
 -nth-child placeholder
 -ドラッグ時に削除エリア設定
 -DraggableObject -> リファクタリング
 -一覧機能など？ -> DOM順に番号づけ
 -Gif対応
*/