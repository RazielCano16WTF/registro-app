package com.evaluacion.registro.controller;

import com.evaluacion.registro.model.Registro;
import com.evaluacion.registro.repository.RegistroRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registros")
public class RegistroController {
    
    @Autowired
    private RegistroRepository registroRepository;
    
    @GetMapping
    public ResponseEntity<List<Registro>> obtenerTodos() {
        List<Registro> registros = registroRepository.findAll();
        return ResponseEntity.ok(registros);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Registro> obtenerPorId(@PathVariable Long id) {
        return registroRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Registro> crear(@Valid @RequestBody Registro registro) {
        Registro nuevoRegistro = registroRepository.save(registro);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoRegistro);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Registro> actualizar(@PathVariable Long id, @Valid @RequestBody Registro registroActualizado) {
        return registroRepository.findById(id)
                .map(registro -> {
                    registro.setNombre(registroActualizado.getNombre());
                    registro.setFechaNacimiento(registroActualizado.getFechaNacimiento());
                    registro.setCorreoElectronico(registroActualizado.getCorreoElectronico());
                    registro.setSexo(registroActualizado.getSexo());
                    registro.setHobbies(registroActualizado.getHobbies());
                    Registro actualizado = registroRepository.save(registro);
                    return ResponseEntity.ok(actualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (registroRepository.existsById(id)) {
            registroRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
