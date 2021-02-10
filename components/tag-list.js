const renderTag = ({ tag, meta }) => `<li><label><input type="checkbox" name="tag" value="${tag}" />${tag} (${meta.numItems})</label></li>`;

export default (tags) => {
  const list = document.getElementById('tag-list');
  list.innerHTML = tags.map(renderTag).join('\n');
}
