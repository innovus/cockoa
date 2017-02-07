package com.example.android.cokoas.Adapters;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.android.cokoas.Activities.LogrosActivity;
import com.example.android.cokoas.Models.Materia;
import com.example.android.cokoas.R;

import java.util.ArrayList;

/**
 * Created by ASUS on 08/06/2016.
 */
public class MateriaAdapters extends RecyclerView.Adapter<MateriaAdapters.ViewHolder> {

    public static ArrayList<Materia> materia;
    public static Activity activity;

    public MateriaAdapters(ArrayList<Materia> materia, Activity activity) {
        super();
        this.materia = materia;
        this.activity = activity;
    }


    //cuando se crea
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_materias, viewGroup, false);
        return new ViewHolder(v);
    }

    //cuando se conecta
    @Override
    public void onBindViewHolder(ViewHolder viewHolder, int position) {
        viewHolder.nombreMateria.setText(materia.get(position).getNombre_materia());
        viewHolder.name1Docente.setText(materia.get(position).getNombre1_docente() + materia.get(position).getNombre2_docente() + materia.get(position).getApellido1_docente() + materia.get(position).getApellido2_docente());
        viewHolder.feed = materia.get(position);
    }

    @Override
    public int getItemCount() {
        return materia.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView nombreMateria, name1Docente;
        public Materia feed;

        public ViewHolder(View itemView) {
            super(itemView);
            nombreMateria = (TextView) itemView.findViewById(R.id.id_text_prueba_fragment);
            name1Docente = (TextView) itemView.findViewById(R.id.id_text_nombre_docente);
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(activity, LogrosActivity.class);
                    intent.putExtra("id_materia", feed.getId_materia());
                    intent.putExtra("nombre_materia", feed.getNombre_materia());
                    intent.putExtra("periodo_actual",feed.getPeriodo_actual());
                    activity.startActivity(intent);
                }
            });
        }
    }

}
