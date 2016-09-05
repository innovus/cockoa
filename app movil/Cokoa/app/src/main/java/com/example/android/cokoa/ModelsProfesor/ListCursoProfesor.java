package com.example.android.cokoa.ModelsProfesor;

import java.util.ArrayList;

/**
 * Created by ASUS on 06/07/2016.
 */
public class ListCursoProfesor {
    private String ombreAsiganatura;
    private ArrayList<Curso> cursos;

    public String getOmbreAsiganatura() {
        return ombreAsiganatura;
    }

    public void setOmbreAsiganatura(String ombreAsiganatura) {
        this.ombreAsiganatura = ombreAsiganatura;
    }

    public ArrayList<Curso> getCursos() {
        return cursos;
    }

    public void setCursos(ArrayList<Curso> cursos) {
        this.cursos = cursos;
    }
}
