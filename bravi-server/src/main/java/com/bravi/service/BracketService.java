package com.bravi.service;


import org.springframework.stereotype.Service;

import java.util.Stack;

@Service
public class BracketService {

    public boolean isBalanced(String inputString) {
        if (inputString == null || inputString.isEmpty()) {
            return true;
        }

        Stack<Character> stack = new Stack<>();
        for (char bracket : inputString.toCharArray()) {
            if (bracket == '(' || bracket == '[' || bracket == '{') {
                stack.push(bracket);
            } else if (bracket == ')' || bracket == ']' || bracket == '}') {
                if (stack.isEmpty()) {
                    return false;
                }
                char top = stack.pop();
                if ((bracket == ')' && top != '(') ||
                        (bracket == ']' && top != '[') ||
                        (bracket == '}' && top != '{')) {
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }
}
