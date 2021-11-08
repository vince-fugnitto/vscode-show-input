
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('vscode-showinput.test', () => {
		showInputBox();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

export async function showInputBox(): Promise<void> {
	const result = await vscode.window.showInputBox({
		value: 'abcdef',
		valueSelection: [2, 4],
		placeHolder: 'For example: abcdef. But not: 123',
		ignoreFocusOut: true,
		validateInput: text => {
			vscode.window.showInformationMessage(`Validating: ${text}`);
			return text === '123' ? 'Not 123!' : null;
		}
	});
	vscode.window.showInformationMessage(`Got: ${result}`);

	const result2 = await vscode.window.showInputBox({
		value: 'xyz',
		placeHolder: 'Type another, for example: xyz.',
	});
	vscode.window.showInformationMessage(`Got: ${result2}`);

	const result3 = await vscode.window.showInputBox({
		value: 'xyz',
		placeHolder: 'Type another, for example: xyz.',
		validateInput: text => null
	});
	vscode.window.showInformationMessage(`Got: ${result3}`);
}
