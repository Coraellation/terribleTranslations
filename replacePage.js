function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    return html;
}

function findTags(document_root){
    var newHtml = DOMtoString(document_root);
    //var arr1 = newHtml.match(/(<p>(.*?)<\/p>)/g);
    // var arr2 = newHtml.match(/(<ul>(.*?)<\/ul>)/g);
    //arrUl.concat(newHtml.match(/(<ul>(.*?)<\/ul>)/g));
    var arr = newHtml.match(/(<p>(.*?)<\/p>)/g);

    //arr.concat(newHtml.match(/(>(.*?)<\/h1>)/g));
    //console.log(arr[0]);    
    for (i = 0; i < arr.length; i++){
        origSentence = arr[i];
        console.log(arr[i]);
        if (arr[i].substr(0,4) == "<ul>"){
            openTag = arr[i].substr(0,4); //for ul tags
            closeTag = arr[i].substr(arr[i].length-6, 5);
            arr[i] = arr[i].substr(4,arr[i].length-9);

        }else{
            openTag = arr[i].substr(0,3); //for p tags
            closeTag = arr[i].substr(arr[i].length-5, 4);
            arr[i] = arr[i].substr(3,arr[i].length-7);
        }
        

        words = arr[i].split(" ");
        for (j = 0; j < words.length;j++){
            words[j]= words[j].substr(1,words[j].length-1)+words[j].charAt(0)+'ay';
            //console.log(words[j]);
        }
        
        newSentence = words.join(" ");
        //console.log(newSentence);
        newSentence = openTag + newSentence + closeTag;
        newHtml = newHtml.replace(origSentence, newSentence);

    }
//    newHtml = newHtml.replace(/(<p>(.*?)<\/p>)/g, "<p>OCTOPUS</p>");
    return newHtml;
}

document.write(findTags(document));
document.close();
