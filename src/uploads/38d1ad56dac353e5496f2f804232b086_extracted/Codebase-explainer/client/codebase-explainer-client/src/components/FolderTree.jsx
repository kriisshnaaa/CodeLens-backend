function FolderTree({ tree, onFileClick }) {
  return (
    <ul>
      {tree.map((node, i) => (
        <TreeNode key={i} node={node} onFileClick={onFileClick} />
      ))}
    </ul>
  );
}

function TreeNode({ node, onFileClick }) {
  if (node.type === "folder") {
    return (
      <li>
        📁 {node.name}
        <ul>
          {node.children.map((child, i) => (
            <TreeNode
              key={i}
              node={child}
              onFileClick={onFileClick}
            />
          ))}
        </ul>
      </li>
    );
  }

  // ✅ FILE: use node.path EXACTLY
  return (
    <li
      style={{ cursor: "pointer" }}
      onClick={() => onFileClick(node.path)}
    >
      📄 {node.name}
    </li>
  );
}

export default FolderTree;
