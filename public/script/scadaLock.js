

(function (userOpts) {

    function PrepareLock() {

        var outerDiv = this.control.outerDiv,
            innerDiv = this.control.innerDiv,
            processingLableUpper = this.control.processingLableUpper,
            messageLable = this.control.messageLable;

        outerDiv.setAttribute("scada-lock", "document-body");
        outerDiv.setAttribute("class", "scadaLock noSelect cursorBusy");
        innerDiv.setAttribute("class", "scadaLockInner");

        processingLableUpper.textContent = "*";
        processingLableUpper.setAttribute("class", "innerLables cursorBackgroundBusy");

        messageLable.textContent = "some loooooooooooooong message...";
        messageLable.setAttribute("class", "innerLables cursorBackgroundBusy");

        innerDiv.appendChild(processingLableUpper);
        innerDiv.appendChild(messageLable);

        outerDiv.appendChild(innerDiv);

        this.messageAnimation = setInterval(() => {
            switch (processingLableUpper.textContent) {

                // case "":
                //     processingLableUpper.textContent = " - - - - - - - ";
                //     break;

                // case " - - - - - - - ":
                //     processingLableUpper.textContent = " > - - - - - - ";
                //     break;

                // case " > - - - - - - ":
                //     processingLableUpper.textContent = " - > - - - - - ";
                //     break;

                // case " - > - - - - - ":
                //     processingLableUpper.textContent = " - - > - - - - ";
                //     break;

                // case " - - > - - - - ":
                //     processingLableUpper.textContent = " - - - > - - - ";
                //     break;

                // case " - - - > - - - ":
                //     processingLableUpper.textContent = " - - - - > - - ";
                //     break;

                // case " - - - - > - - ":
                //     processingLableUpper.textContent = " - - - - - > - ";
                //     break;

                // case " - - - - - > - ":
                //     processingLableUpper.textContent = " - - - - - - > ";
                //     break;

                // // case " - - - - - - > ":
                // //     processingLableUpper.textContent = " > - - - - - - ";
                // //     break

                // case " - - - - - - > ":
                //     processingLableUpper.textContent = " - - - - - - < ";
                //     break;

                // case " - - - - - - < ":
                //     processingLableUpper.textContent = " - - - - - < - ";
                //     break;

                // case " - - - - - < - ":
                //     processingLableUpper.textContent = " - - - - < - - ";
                //     break;

                // case " - - - - < - - ":
                //     processingLableUpper.textContent = " - - - < - - - ";
                //     break;

                // case " - - - < - - - ":
                //     processingLableUpper.textContent = " - - < - - - - ";
                //     break;

                // case " - - < - - - - ":
                //     processingLableUpper.textContent = " - < - - - - - ";
                //     break;

                // case " - < - - - - - ":
                //     processingLableUpper.textContent = " < - - - - - - ";
                //     break;

                // case " < - - - - - - ":
                //     processingLableUpper.textContent = " > - - - - - - ";
                //     break;






                case "":
                    processingLableUpper.textContent = "*";
                    break

                case "*":
                    processingLableUpper.textContent = "***";
                    break

                case "***":
                    processingLableUpper.textContent = "*****";
                    break

                case "*****":
                    processingLableUpper.textContent = "*******";
                    break

                case "*******":
                    processingLableUpper.textContent = "*** ***";
                    break

                case "*** ***":
                    processingLableUpper.textContent = "**   **";
                    break

                case "**   **":
                    processingLableUpper.textContent = "*     *";
                    break

                case "*     *":
                    processingLableUpper.textContent = "*";
                    break




                // case "":
                //     processingLableUpper.textContent = "*";
                //     break

                // case "*":
                //     processingLableUpper.textContent = "**";
                //     break

                // case "**":
                //     processingLableUpper.textContent = "***";
                //     break

                // case "***":
                //     processingLableUpper.textContent = "*";
                //     break




                // case "":
                //     processingLableUpper.textContent = "*";
                //     break

                // case "*":
                //     processingLableUpper.textContent = "**";
                //     break

                // case "**":
                //     processingLableUpper.textContent = "***";
                //     break

                // case "***":
                //     processingLableUpper.textContent = "#";
                //     break

                // case "#":
                //     processingLableUpper.textContent = "##";
                //     break

                // case "##":
                //     processingLableUpper.textContent = "###";
                //     break

                // case "###":
                //     processingLableUpper.textContent = "@";
                //     break

                // case "@":
                //     processingLableUpper.textContent = "@@";
                //     break

                // case "@@":
                //     processingLableUpper.textContent = "@@@";
                //     break

                // case "@@@":
                //     processingLableUpper.textContent = "*";
                //     break

                default:
                    processingLableUpper.textContent = "";
                    console.log(`processingLableUpper.innerHTML: ${processingLableUpper.innerHTML}`);
                    break

            }
        }, 100)
    }

    this.PageLock = function () {

        var defaults = {
            message: "no message..."
            , fadeInTime: 100
            , fadeOut: 100
        }

        this.control = {};
        this.control.outerDiv = document.createElement("div")
            , this.control.innerDiv = document.createElement("div")
            , this.control.processingLableUpper = document.createElement("lable")
            , this.control.messageLable = document.createElement("lable");

    }

    PageLock.prototype.Show = function (o) {

        if (document.querySelectorAll('[scada-lock]').length === 0) {
            PrepareLock.call(this);
        }

        document.body.appendChild(this.control.outerDiv);
        if (o.hasOwnProperty("message")) {
            this.Message({ message: o.message })
        }

        if (o.hasOwnProperty("hideTimeout")) {
            var self = this;
            setTimeout(function () {
                self.Hide();
            }, o.hideTimeout);
        }
    }

    PageLock.prototype.Hide = function (o) {

        if (o === undefined) o = {};

        var self = this;
        setTimeout(function () {

            if (document.body.contains(self.control.outerDiv)) {
                document.body.removeChild(self.control.outerDiv);
            } else { 
                console.warn("scadaLock not found in <body>");
            }
        }, replaceNull(o.hideTimeout, 500));

        clearInterval(this.messageAnimation);
    }

    PageLock.prototype.Message = function (o) {
        if (!o.hasOwnProperty("message")) {
            console.warn("No message to display in lock screen or add a pass empty object to Message property.");
            return;
        }
        this.control.messageLable.textContent = o.message;
    }

}())
