package com.skatespotter.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dbnijevzp",
                "api_key", "663715136252161",
                "api_secret", "m9PXDjAu__BFIOsEV3PsvBRjMAA"));
    }
}
