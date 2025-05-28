package com.medihub;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Home {

    @GetMapping("/")
    public String home() {
        return "Welcome to MediHub backend! " +
                " \n - ft.Kamaleshwaran [Medihub Team] ";

    }
}