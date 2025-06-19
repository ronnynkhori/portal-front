import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "@btc/shared/environment";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private apiUrl =  environment.apiUrl + "btckyc/api/v1/"; // Replace with your actual API URL

  constructor(private http: HttpClient) {
  }

  requestSmsOtp(msisdn: string): Observable<any> {
    return this.http.get(`/btckyc/api/v1/generate-otp?msisnd=${msisdn}`);
  }

  testOtp(): Observable<any> {
    return this.http.get(`${this.apiUrl}test`);
  }

  validateOtpCode(msisdn: string, otpCode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/validate-otp/${msisdn}/${otpCode}`);
  }
  resendOtpCode(msisdn: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/resend-otp/${msisdn}`);
  }
  validateMsisdn(msisdn: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/validate-msisdn/${msisdn}`);
  }

  getNaturalSubscriberByMsisdnAndDocumentNumber(verificationObject: { msisdn: string, documentNumber: string }): Observable<any> {
    return this.http.post(`/btckyc/api/v1/natural-subscriber/verify`, verificationObject);
  }

}
