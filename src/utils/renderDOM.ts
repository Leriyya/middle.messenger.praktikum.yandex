interface RenderableBlock {
  getContent(): HTMLElement;
  dispatchComponentDidMount(): void;
}

export function render(query: string, block: RenderableBlock): HTMLElement {
  const root = document.querySelector<HTMLElement>(query);

  if (!root) {
    throw new Error(`Root element not found: ${query}`);
  }

  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
}
