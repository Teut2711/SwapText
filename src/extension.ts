// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('relevent-project.interchangeText', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;
		if (editor) {

			if (editor.selections.length === 2) {
				swapText(editor);

			}
			else {
				vscode.window.showErrorMessage('Please make 2 selections in order to swap them');
			}

		}
		context.subscriptions.push(disposable);
	});
}

async function swapText(editor: vscode.TextEditor) {
	const document = editor.document;
	const selections = editor.selections;

	const [text1, text2] = selections.map(document.getText);
	const boolean = await editor.edit(editBuilder => {
		editBuilder.replace(selections[0], text2);
		editBuilder.replace(selections[1], text1);
	});
	if (boolean) {
		vscode.window.showInformationMessage("Swap completed!");
	}
	else {
		vscode.window.showErrorMessage("Swap failed");
	}
}
// this method is called when your extension is deactivated
export function deactivate() {
}
