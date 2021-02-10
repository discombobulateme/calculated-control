const renderTag = ({ tag, meta }) => `<li>${tag} (${meta.numItems})</li>`;

export default (tags) => {
  const list = document.getElementById('tag-list');
  list.innerHTML = tags.map(renderTag).join('\n');
}
