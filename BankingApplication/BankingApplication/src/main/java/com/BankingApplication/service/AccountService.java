package com.BankingApplication.service;


import java.util.List;

import com.BankingApplication.dto.AccountDto;

public interface AccountService {

	AccountDto createAccount(AccountDto account);
	
	AccountDto getAccountById(Long id);

	AccountDto depositAmount(Long id, double amount);

	AccountDto withdrawAmount(Long id, double amount);

	void deleteAccount(Long id);

	List<AccountDto> getAllAccounts();
}

	
