package com.example.android.cokoas.ModelsProfesor;

/**
 * Created by ASUS on 14/02/2017.
 */
public class CursoProfesor {
    private String nombreMateria;
    private String idCurso;
    private String grado;
    private String curso;
    private String idCargaProfesor;


    public String getIdCcurso() {
        return idCurso;
    }

    public void setIdCcurso(String id_curso) {
        this.idCurso = id_curso;
    }

    public String getGrado() {
        return grado;
    }

    public void setGrado(String grado) {
        this.grado = grado;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }


    public String getIdCargaProfesor() {
        return idCargaProfesor;
    }

    public void setIdCargaProfesor(String idCargaProfesor) {
        this.idCargaProfesor = idCargaProfesor;
    }



    public String getNombreMateria() {
        return nombreMateria;
    }

    public void setNombreMateria(String nombreMateria) {
        this.nombreMateria = nombreMateria;
    }
}
