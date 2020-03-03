var LABLE_DONE = 'done_by_me'


function doGet(e){
   var serveFile = e.parameter.servefile;
   var id = e.parameter.id;
   let lastUrl = e.parameter.lastUrl == 'true';
   
   if(serveFile)
   {
     return downloadMail(id, lastUrl); // and Hyde
   }
   
  return HtmlService.createHtmlOutputFromFile('form.html'); // Jekyll
}


function fetchFromGmail() { // Jekyll
  var scriptProperties = PropertiesService.getScriptProperties();
  var start = 0
  var max = 100

  var threads = GmailApp.search('(label:Send AND NOT label:'+ LABLE_DONE +' AND NOT label:calendar-stuff )', start, max)
  if (threads.length == 0) {
    return ''
  } 
  
  for (var i = 0; i < 1; i++) {  
    var messages = threads[i].getMessages();
    var links = [];
    for (var j = 0; j < messages.length; j++) {
      var link = ScriptApp.getService().getUrl()+"?servefile=true&id="+messages[j].getId();
      links.push(link)
    }
    return JSON.stringify(links);;
    
  }
  return '';
 
}



function auto_dowload_mails() {
  var label_name = "TestL";
  var driveFolder  = "LableTest";

  var label = GmailApp.getUserLabelByName(label_name); // A label that signifies emails marked for deletion

  if(label == null){
    GmailApp.createLabel(label_name);
  }
  else{

    var threads = label.getThreads();
    for (var i = 0; i < threads.length; i++) {
      var messages = threads[i].getMessages();
      for (var j = 0; j < messages.length; j++) {
        save_to_gdrive(driveFolder, messages[j].getSubject() + ".eml", messages[j].getRawContent());
        
      }
    }
  }
}


function save_to_gdrive(driveFolder, file_name, file_content) {
  /* Google Drive folder where the Files would be saved */
  var folders = DriveApp.getFoldersByName(driveFolder);
  var folder = folders.hasNext() ?
      folders.next() : DriveApp.createFolder(driveFolder);
  folder.createFile(file_name, file_content)
}


function trigger_download(file_name, file_content) {
  var cs = ContentService.createTextOutput(file_content);
  cs.downloadAsFile("test sdsad ss.eml")
}

function downloadMail(id, lastUrl){ // and Hyde  
  try
  {
    var amail = GmailApp.getMessageById(id)
  
    var acontent = amail.getRawContent();
    
    var output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.TEXT);
    output.setContent(acontent);
    output.downloadAsFile(id + ".eml");
    if (lastUrl == true) {
      let label = GmailApp.getUserLabelByName(LABLE_DONE);
      amail.getThread().addLabel(label)
      console.log("Last Message " + amail.getId() + "  in Thread. Set Lable")
    }
    
    return output;
  }
  catch (e) {
    return ContentService.createTextOutput('Nothing To Download: ' + e)
  }
}