package com.bravi.controller;

import com.bravi.service.BracketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Stack;

@RestController
public class BracketController {

    private final BracketService bracketService;

    public BracketController(BracketService bracketService) {
        this.bracketService = bracketService;
    }

    @PostMapping("/validate")
    public ResponseEntity<Boolean> validateBrackets(@RequestBody String inputString) {
        boolean isValid = bracketService.isBalanced(inputString);
        return ResponseEntity.status(HttpStatus.OK).body(isValid);
    }
}