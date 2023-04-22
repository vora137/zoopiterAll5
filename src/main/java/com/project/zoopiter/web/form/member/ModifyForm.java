package com.project.zoopiter.web.form.member;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ModifyForm {
  private String userId;
  @NotBlank
  private String userNick;

  private List<MultipartFile> imageFiles; // �̹�������
  private String userEmail;
  private Long userPhoto;
}
