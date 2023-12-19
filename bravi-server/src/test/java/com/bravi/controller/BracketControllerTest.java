package com.bravi.controller;

import com.bravi.service.BracketService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;

import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class BracketControllerTest {

    @Mock
    private BracketService bracketService;

    @InjectMocks
    private BracketController bracketController;

    @Test
    public void testValidateBracketsValid() {
        String validSequence = "({[]})";
        when(bracketService.isBalanced(validSequence)).thenReturn(true);

        ResponseEntity<Boolean> response = bracketController.validateBrackets(validSequence);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody());
    }

    @Test
    public void testValidateBracketsWithSpaces() {
        String sequenceWithSpaces = "{ [ ( ) ] }";
        when(bracketService.isBalanced(sequenceWithSpaces)).thenReturn(true);

        ResponseEntity<Boolean> response = bracketController.validateBrackets(sequenceWithSpaces);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody());
    }

    @Test
    public void testValidateBracketsWithOtherCharacters() {
        String sequenceWithOtherCharacters = "[abc{def}]";
        when(bracketService.isBalanced(sequenceWithOtherCharacters)).thenReturn(true);

        ResponseEntity<Boolean> response = bracketController.validateBrackets(sequenceWithOtherCharacters);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody());
    }

    @Test
    public void testValidateBracketsNestedInvalid() {
        String nestedInvalidSequence = "{[()()]}]";
        when(bracketService.isBalanced(nestedInvalidSequence)).thenReturn(false);

        ResponseEntity<Boolean> response = bracketController.validateBrackets(nestedInvalidSequence);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertFalse(response.getBody());
    }
}
