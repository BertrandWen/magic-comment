// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, env, ExtensionContext, Position, Range, Selection, TextDocument, TextEditor, window, workspace, WorkspaceEdit } from 'vscode';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "magic-comment" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = commands.registerCommand('extension.magicComment', () => {
		// The code you place here will be executed every time your command is executed
		
		// magic comment part
		magic_comment();
	});

	context.subscriptions.push(disposable);
}

function magic_comment() {
	const editor = window.activeTextEditor;
	const doc = editor.document;
	editor.selections.forEach(async selection => {
		for (let i = selection.start.line; i <= selection.end.line; i++) {
			const position = editor.selection.active;
			var newPosition = position.with(i, 0);
			var newSelection = new Selection(newPosition, newPosition);
			editor.selection = newSelection;
			await commands.executeCommand('editor.action.commentLine');
		}
	});
}


// this method is called when your extension is deactivated
export function deactivate() {}
