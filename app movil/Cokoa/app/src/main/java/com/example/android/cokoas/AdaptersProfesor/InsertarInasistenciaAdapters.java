package com.example.android.cokoas.AdaptersProfesor;

import android.app.Activity;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.TextView;

import com.example.android.cokoas.ModelsProfesor.EstudianteCurso;
import com.example.android.cokoas.R;

import java.util.ArrayList;

/**
 * Created by ASUS on 14/08/2016.
 */
public class InsertarInasistenciaAdapters extends RecyclerView.Adapter<InsertarInasistenciaAdapters.ViewHolder> {
    public static ArrayList<EstudianteCurso> estudianteCursos;
    public static Activity activity;

    public InsertarInasistenciaAdapters(ArrayList<EstudianteCurso> estudianteCursos, Activity activity) {
        super();
        this.estudianteCursos = estudianteCursos;
        this.activity = activity;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_llamar_lista, viewGroup, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder viewHolder, final int position) {
        viewHolder.numeroLista.setText(estudianteCursos.get(position).getNumeroLista());
        viewHolder.codigoEstudiante.setText(estudianteCursos.get(position).getCodigoEstudiante());
        viewHolder.nombreEstudiante.setText(estudianteCursos.get(position).getNombreEstudiante());
        viewHolder.cbSelect.setOnCheckedChangeListener(null);
        viewHolder.cbSelect.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {

            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                estudianteCursos.get(position).setInasistencia(isChecked);
            }
        });

    }

    @Override
    public int getItemCount() {
        return estudianteCursos.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView numeroLista, codigoEstudiante, nombreEstudiante;
        public CheckBox cbSelect;
        EstudianteCurso estudianteCurso;

        public ViewHolder(View itemView) {
            super(itemView);
            numeroLista = (TextView) itemView.findViewById(R.id.id_text_lista_curso_estudiante_inasistencia);
            codigoEstudiante = (TextView) itemView.findViewById(R.id.id_text_codigo_estudiante_inasistencia);
            nombreEstudiante = (TextView) itemView.findViewById(R.id.id_text_nombre_estudiante_inasistencia);
            cbSelect = (CheckBox) itemView.findViewById(R.id.id_check_inasistencia);


        }


    }

    public ArrayList<EstudianteCurso> getInasistencia(){
        return estudianteCursos;
    }


}
