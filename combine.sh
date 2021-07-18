FILENAME=dist/combined.html
echo '<div id="app"></div>' > $FILENAME
echo "<noscript><strong>Désolé, mais L-Zass Price Checklist ne fonctionnera que si vous activez JavaScript.</strong></noscript>" >> $FILENAME
echo "<style>" >> $FILENAME
cat dist/css/*.css >> $FILENAME
echo "</style>" >> $FILENAME
echo "<script>" >> $FILENAME
cat dist/js/*.js >> $FILENAME
echo "</script>" >> $FILENAME
sed -i 's/^\/\/# sourceMappingURL=.*\.js\.map//g' $FILENAME #retrait commentaire