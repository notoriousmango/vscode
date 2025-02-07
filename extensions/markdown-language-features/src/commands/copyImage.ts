/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import fetch from 'node-fetch';

import * as vscode from 'vscode';
import { Command } from '../commandManager';
import { MarkdownPreviewManager } from '../preview/previewManager';

export class CopyImageCommand implements Command {
	public readonly id = '_markdown.copyImage';

	public constructor(
		private readonly _webviewManager: MarkdownPreviewManager,
	) { }

	public async execute(args: { id: string; resource: string; imageSource: string }) {
		const source = vscode.Uri.parse(args.resource);
		const response = await fetch(args.imageSource);
		const arrayBuffer = await response.arrayBuffer();
		const base64data = Buffer.from(arrayBuffer).toString('base64');
		const final = 'data:image/png;base64,' + base64data;
		this._webviewManager.findPreview(source)?.copyImage(final);
	}
}
