export class ApiResponseHelper {
    // Başarılı API cevabı oluşturur
    static success(message: string, data: any = null) {
        return {
            status: 'success',  // Başarılı işlem durumu
            message,            // İşlemin mesajı (örneğin: "Friend created successfully")
            data,               // Döndürülecek veri (isteğe bağlı)
            timestamp: new Date().toISOString(), // İşlem zamanı
        };
    }
}
