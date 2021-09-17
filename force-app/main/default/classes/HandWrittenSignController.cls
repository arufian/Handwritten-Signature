public class HandWrittenSignController {
    @AuraEnabled
    public static String aSaveSign(String b64, String rid){
        try{
            String pdfTitle = 'Sign.png';
            ContentVersion v = new ContentVersion(
                versionData = EncodingUtil.base64Decode(b64),
                title = pdfTitle,
                PathOnClient = pdfTitle
            );
            insert v;
            ContentVersion v2 = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:v.Id LIMIT 1];
            ContentDocumentLink cdl = new ContentDocumentLink();
			cdl.ContentDocumentId = v2.ContentDocumentId;
            cdl.LinkedEntityId = rid;
            cdl.ShareType = 'V';
            insert cdl;
            return 'success';
        } catch (Exception ex){
 			return 'error';           
        }
    }    
}