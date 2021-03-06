package com.example.android.cokoas.AdaptersProfesor;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.example.android.cokoas.ActivityProfesor.LogrosMateriaEstudianteProfesorActivity;
import com.example.android.cokoas.ModelsProfesor.CursosProfesor;
import com.example.android.cokoas.R;

import java.util.ArrayList;

/**
 * Created by juancarlospantoja@hotmail.com on 05/07/2016.
 */
public class CusosProfesorAdapters extends RecyclerView.Adapter<CusosProfesorAdapters.ViewHolder> {
    public static ArrayList<CursosProfesor> cursosProfesors;
   public static Activity activity;
    ArrayAdapter<String> mLeadsAdapter;

    public CusosProfesorAdapters(ArrayList<CursosProfesor> cursosProfesors, Activity activity) {
        super();
        this.cursosProfesors = cursosProfesors;
        this.activity = activity;
    }


    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_curso_profesor, viewGroup, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder viewHolder, int position) {
        viewHolder.nombreMateria.setText(cursosProfesors.get(position).getNombreMateria());
        viewHolder.curso.setText(cursosProfesors.get(position).getCurso());
        viewHolder.grado.setText(cursosProfesors.get(position).getGrado());
        viewHolder.cursosProfesor = cursosProfesors.get(position);


    }

    @Override
    public int getItemCount() {
        return cursosProfesors.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView nombreMateria, curso,grado;
        CursosProfesor cursosProfesor;
        public ViewHolder(View itemView) {
            super(itemView);
            nombreMateria = (TextView) itemView.findViewById(R.id.id_text_nombremateria_curso);
            curso = (TextView) itemView.findViewById(R.id.id_text_curso_materia_profesor);
            grado = (TextView) itemView.findViewById(R.id.id_text_grado_materia_profesor);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(activity, LogrosMateriaEstudianteProfesorActivity.class);
                    intent.putExtra("id_curso",cursosProfesor.getId_Curso());
                    intent.putExtra("nombre_materia",cursosProfesor.getNombreMateria());
                    intent.putExtra("id_carda_docente",cursosProfesor.getIdCargaDocente());
                    activity.startActivity(intent);
                }
            });

        }
    }


}
