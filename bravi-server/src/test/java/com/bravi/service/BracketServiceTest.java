package com.bravi.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class BracketServiceTest {

    @Test
    public void testIsBalancedValid() {
        BracketService service = new BracketService();
        String validSequence = "({[]})";
        assertTrue(service.isBalanced(validSequence));
    }

    @Test
    public void testIsBalancedInvalid() {
        BracketService service = new BracketService();
        String invalidSequence = "[{)]";
        assertFalse(service.isBalanced(invalidSequence));
    }

    @Test
    public void testIsBalancedEmpty() {
        BracketService service = new BracketService();
        String emptySequence = "";
        assertTrue(service.isBalanced(emptySequence));
    }

    @Test
    public void testIsBalancedNull() {
        BracketService service = new BracketService();
        String nullSequence = null;
        assertTrue(service.isBalanced(nullSequence));
    }
}