package com.bravi.integration;

import com.bravi.service.BracketService;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class BracketControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BracketService bracketService;

    @Test
    public void testValidateBracketsEndpointValid() throws Exception {
        String validSequence = "({[]})";
        mockMvc.perform(post("/validate")
                        .content(validSequence)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    public void testValidateBracketsEndpointInvalid() throws Exception {
        String invalidSequence = "[{)]";
        mockMvc.perform(post("/validate")
                        .content(invalidSequence)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("false"));
    }
}
