package com.BankingApplication.controller;



import java.util.Base64;
import java.util.List;
import java.util.Map;

import org.springframework.http.CacheControl;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BankingApplication.dto.AccountDto;
import com.BankingApplication.service.AccountService;




@RestController
@RequestMapping("/api/accounts")
public class AccountController {
	
	private AccountService accountService;
	
	public AccountController(AccountService accountService) {
		super();
		this.accountService = accountService;
	}
	
	@PostMapping
	public ResponseEntity<AccountDto> addAccount( @RequestBody AccountDto accountDto){
		return new ResponseEntity<>(accountService.createAccount(accountDto),HttpStatus.CREATED);
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<AccountDto> getAccountById(@PathVariable Long id){
	AccountDto accountDto = accountService.getAccountById(id);
	return ResponseEntity.ok(accountDto);
}
	
	@PostMapping("/{id}/deposit")
	public ResponseEntity<AccountDto> depositAmount(
	        @PathVariable Long id, 
	        @RequestBody double amount) {
	    
	    AccountDto updatedAccount = accountService.depositAmount(id, amount);
	    return ResponseEntity.ok(updatedAccount);
	}

	@PostMapping("/{id}/withdraw")
	public ResponseEntity<AccountDto> withdrawAmount(
	        @PathVariable Long id, 
	        @RequestBody double amount) {
	    
	    AccountDto updatedAccount = accountService.withdrawAmount(id, amount);
	    return ResponseEntity.ok(updatedAccount);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteAccount(@PathVariable Long id) {
	    accountService.deleteAccount(id);
	    return ResponseEntity.ok("Account deleted successfully.");
	}

	@GetMapping
	public ResponseEntity<List<AccountDto>> getAllAccounts() {
	    List<AccountDto> accounts = accountService.getAllAccounts();
	    return ResponseEntity.ok(accounts);
	}

	@PostMapping("/download")
    public ResponseEntity<byte[]> downloadPdfFromBase64(@RequestBody Map<String, String> body) {
        try {
            String base64Pdf = body.get("base64Html");

            if (base64Pdf == null || base64Pdf.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            // Remove prefix if present
            if (base64Pdf.startsWith("data:")) {
                base64Pdf = base64Pdf.substring(base64Pdf.indexOf(",") + 1);
            }

            // Clean string (remove newlines, spaces)
            base64Pdf = base64Pdf.replaceAll("\\s+", "");

            // Decode Base64 to bytes
            byte[] pdfBytes = Base64.getMimeDecoder().decode(base64Pdf);

            // 🧾 Set response headers to trigger browser download
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(
                    ContentDisposition.builder("attachment")
                            .filename("downloaded.pdf")
                            .build()
            );
            headers.setCacheControl(CacheControl.noCache().getHeaderValue());

            // 📨 Return as downloadable file
            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .contentLength(pdfBytes.length)
                    .body(pdfBytes);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }
    }
}
 