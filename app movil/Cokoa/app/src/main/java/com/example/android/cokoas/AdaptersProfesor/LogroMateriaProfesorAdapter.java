package com.example.android.cokoas.AdaptersProfesor;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.android.cokoas.ActivityProfesor.InsertarNotaActividadActivity;
import com.example.android.cokoas.ModelsProfesor.LogroProfesor;
import com.example.android.cokoas.R;

import java.util.ArrayList;

/**
 * Created by ASUS on 13/10/2016.
 */
public class LogroMateriaProfesorAdapter extends RecyclerView.Adapter<LogroMateriaProfesorAdapter.ViewHolder> {
    private ArrayList<LogroProfesor> logroProfesors;
    private static Activity activity;

    public LogroMateriaProfesorAdapter(ArrayList<LogroProfesor> logroProfesors, Activity activity) {
        super();
        this.logroProfesors = logroProfesors;
        this.activity = activity;
    }

    public  static  class ViewHolder extends RecyclerView.ViewHolder{
        public TextView descLogro,numeroLogroProfesor,porcentajeLogro;
        LogroProfesor logroProfesor;
        public ViewHolder(View itemView) {
            super(itemView);
            descLogro = (TextView) itemView.findViewById(R.id.txt_des_logro_materia_profesor);
            numeroLogroProfesor = (TextView) itemView.findViewById(R.id.numeroLogroProfesor);
            porcentajeLogro = (TextView) itemView.findViewById(R.id.txt_porcentaje_logro_profesor);
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(activity, InsertarNotaActividadActivity.class);
                    intent.putExtra("id_curso", logroProfesor.getId_curso());
                    intent.putExtra("id_carga_docente", logroProfesor.getId_carga_docente());
                    intent.putExtra("id_logro", logroProfesor.getIdLogro());
                    intent.putExtra("descripcion_logro",logroProfesor.getDescripcionLogro());

                    activity.startActivity(intent);
                }
            });
        }
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_logro_materia_profesor, viewGroup, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder viewHolder, int position) {
        viewHolder.descLogro.setText(logroProfesors.get(position).getDescripcionLogro());
        viewHolder.logroProfesor = logroProfesors.get(position);
        viewHolder.numeroLogroProfesor.setText("Logro "+Integer.toString(position+1));
        viewHolder.porcentajeLogro.setText(logroProfesors.get(position).getPorcentajeLogro()+"%");
    }

    @Override
    public int getItemCount() {
        return logroProfesors.size();
    }








    /* public static class ViewHolder extends RecyclerView.ViewHolder {*/
}
