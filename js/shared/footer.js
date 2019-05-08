/*
  Generic footer writer to implement on all pages.
  This footer is created once while the page loads -> document.write is sufficient here.
 */
document.write(`
<div class="footer">
    <link rel="stylesheet" href="css/footer.css">
    <a id="href-faq" href="faq.html">FAQ</a>
</div>`
);