# n-tree-traversal
CSS filter property destroys "position: fixed" elements in Firefox,
but it's a needed property, such as for Web Accessibility reasons.
With this recursive algorithm we can apply the needed CSS filter property
to specific elements without further modifications into our HTML code. The
result is equivalent with applying filter into html element without the position
malfunctions.

In my example, I apply "filter: invert(200%)" property as you can see:
`node.style.filter = 'invert(200%)';`

