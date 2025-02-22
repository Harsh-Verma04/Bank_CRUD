package com.BankingApplication.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.BankingApplication.dto.AccountDto;
import com.BankingApplication.entity.Account;
import com.BankingApplication.mapper.AccountMapper;
import com.BankingApplication.repository.AccountRepository;
import com.BankingApplication.service.AccountService;

@Service
public class AccountServiceImpl implements AccountService {
	
	private AccountRepository accountRepository;
	public AccountServiceImpl(AccountRepository accountRepository) {
		super();
		this.accountRepository = accountRepository;
	}

	@Override
	public AccountDto createAccount(AccountDto accountDto) {
		Account account = AccountMapper.mapToAccount(accountDto);
		Account savedAccount = accountRepository.save(account);
		return AccountMapper.mapToAccountDto(savedAccount); 
		
	}

	@Override
	public AccountDto getAccountById(Long id) {
		Account account = accountRepository.findById(id).orElseThrow( ()->new RuntimeException("Account does not exist"));
		return AccountMapper.mapToAccountDto(account);
	}

	@Override
	public AccountDto depositAmount(Long id, double amount) {
	    // Fetch the account from the database
	    Account account = accountRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Account does not exist"));

	    // Validate deposit amount
	    if (amount <= 0) {
	        throw new IllegalArgumentException("Deposit amount must be greater than zero.");
	    }

	    // Update balance
	    account.setBalance(account.getBalance() + amount);

	    // Save updated account to the database
	    Account updatedAccount = accountRepository.save(account);

	    // Convert entity to DTO and return
	    return AccountMapper.mapToAccountDto(updatedAccount);
	}

	@Override
	public AccountDto withdrawAmount(Long id, double amount) {
	    // Fetch the account from the database
	    Account account = accountRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Account does not exist"));

	    // Validate withdrawal amount
	    if (amount <= 0) {
	        throw new IllegalArgumentException("Withdrawal amount must be greater than zero.");
	    }

	    // Check if the account has sufficient balance
	    if (account.getBalance() < amount) {
	        throw new IllegalArgumentException("Insufficient balance.");
	    }

	    // Deduct amount from balance
	    account.setBalance(account.getBalance() - amount);

	    // Save updated account to the database
	    Account updatedAccount = accountRepository.save(account);

	    // Convert entity to DTO and return
	    return AccountMapper.mapToAccountDto(updatedAccount);
	}


	@Override
	public void deleteAccount(Long id) {
	    // Check if the account exists
	    Account account = accountRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Account does not exist"));

	    // Delete the account
	    accountRepository.delete(account);
	}

	@Override
	public List<AccountDto> getAllAccounts() {
	    List<Account> accounts = accountRepository.findAll();

	    // Convert entity list to DTO list
	    return accounts.stream()
	            .map(AccountMapper::mapToAccountDto)
	            .collect(Collectors.toList());
	}
	
	




	
	 

	

	

}
