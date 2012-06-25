jquery-videopreview-plugin
==========================

Speed up page load by loading a preview image instead of the actual video

Currently only videos from YouTube are supported.

Options
-------

<table>
  <tr>
		<th>Name</th>
		<th>Type</th>
		<th>Default</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>highRes</td>
		<td>boolean</td>
		<td>true</td>
		<td>Use 480x360 (true) or 120x90 (false) preview image</td>
	</tr>
	<tr>
		<td>fluid</td>
		<td>boolean</td>
		<td>false</td>
		<td></td>
	</tr>
	<tr>
		<td>autoSize</td>
		<td>boolean</td>
		<td>true</td>
		<td></td>
	</tr>
  <tr>
		<td>caption</td>
		<td>string</td>
		<td>''</td>
		<td></td>
	</tr>
  <tr>
  	<td>imageSelector</td>
		<td>string</td>
		<td>'.vp-image'</td>
		<td></td>
	</tr>
  <tr>
    <td>selector</td>
		<td>string</td>
		<td>'iframe[src*='www.youtube.com']'</td>
		<td></td>
	</tr>
  <tr>
    <td>template</td>
  	<td>string</td>
		<td>'button'</td>
		<td>Can be 'text', 'button' or custom HTML template</td>
	</tr>
  <tr>
    <td>templates</td>
    <td>object</td>
		<td>see source</td>
		<td></td>
	</tr>  
</table>

Events
------

<table>
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>activate</td>
    <td>Image is clicked</td>
  </tr>
  <tr>
    <td>load</td>
    <td>Image has been loaded</td>
  </tr>
</table>

Usage
-------

    <!-- First example -->
    <iframe id="video1" width="420" height="315" src="http://www.youtube.com/embed/h_L4Rixya64" frameborder="0" allowfullscreen></iframe>
    <script>
    $("#video1").videoPreview({
        template: "text",
        caption: "Hello World!"
    });
    </script>
    
    <!-- Second example -->
    <iframe data-caption="Woo Hoo!" data-template="button" width="420" height="315" src="http://www.youtube.com/embed/h_L4Rixya64" frameborder="0" allowfullscreen></iframe>
    <script>
    $("body").videoPreview();
    </script>
    