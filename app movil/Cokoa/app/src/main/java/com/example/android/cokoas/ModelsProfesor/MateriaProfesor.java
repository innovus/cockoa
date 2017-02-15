package com.example.android.cokoas.ModelsProfesor;

import java.util.ArrayList;

/**
 * Created by ASUS on 14/02/2017.
 */
public class MateriaProfesor {
    private String idMateria;
    private String nombreMateria;
    private ArrayList<CursoProfesor> cursoProfesors;

    public String getIdMateria() {
        return idMateria;
    }

    public void setIdMateria(String idMateria) {
        this.idMateria = idMateria;
    }

    public String getNombreMateria() {
        return nombreMateria;
    }

    public void setNombreMateria(String nombreMateria) {
        this.nombreMateria = nombreMateria;
    }

    public ArrayList<CursoProfesor> getCursoProfesors() {
        return cursoProfesors;
    }

    public void setCursoProfesors(ArrayList<CursoProfesor> cursoProfesors) {
        this.cursoProfesors = cursoProfesors;
    }
}
