var hx = require("hbuilderx");

//该方法将在插件激活的时候调用
function activate(context) {
    let getEditorCursorPosition = hx.commands.registerCommand('api.getEditorCursorPosition', () => {
        let activeEditor = hx.window.getActiveTextEditor();
        activeEditor.then(function(editor) {
            let lineFromPosition = editor.document.lineFromPosition(editor.selection.active);
            lineFromPosition.then((line) => {
                let lineNumber = line.lineNumber - 1;
                let columnNumber = (line.text).length;
                let msg = `${lineNumber}, ${columnNumber}`;
                hx.window.setStatusBarMessage(msg, 5000, "info");
                hx.env.clipboard.writeText(msg);
            });
        });
    });
    
    //订阅销毁钩子，插件禁用的时候，自动注销该command。
    context.subscriptions.push(getEditorCursorPosition);
};

//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

};

module.exports = {
    activate,
    deactivate
}
