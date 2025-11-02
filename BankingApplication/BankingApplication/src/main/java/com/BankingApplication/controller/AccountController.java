package com.BankingApplication.controller;


import java.util.List;


import org.springframework.http.HttpStatus;
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


}
 