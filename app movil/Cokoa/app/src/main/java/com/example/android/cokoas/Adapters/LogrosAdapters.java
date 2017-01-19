package com.example.android.cokoas.Adapters;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.android.cokoas.Activities.NotasActivity;
import com.example.android.cokoas.Models.Logro;
import com.example.android.cokoas.R;

import java.util.ArrayList;

/**
 * Created by juancarlospantoja@hotmail.com on 09/06/2016.
 */
public class LogrosAdapters extends RecyclerView.Adapter<LogrosAdapters.ViewHolder> {
    private ArrayList<Logro> logros;
    private static Activity activity;

    public LogrosAdapters(ArrayList<Logro> logros, Activity activity) {
        super();
        this.logros = logros;
        this.activity = activity;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView  numeroLogro,descLogro,numeroPerido,porcentajeLogro,nombreMaterias;

        Logro logro;

        public ViewHolder(View itemView) {
            super(itemView);
            numeroLogro = (TextView) itemView.findViewById(R.id.txt_num_logro);
            descLogro = (TextView) itemView.findViewById(R.id.text_des_logro);
            numeroPerido = (TextView) itemView.findViewById(R.id.text_numero_periodo);
            porcentajeLogro = (TextView) itemView.findViewById(R.id.txt_porcentaje_logro_estudiante);
            nombreMaterias = (TextView) activity.findViewById(R.id.txtNombreMateria);


            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                   Intent intent = new Intent(activity, NotasActivity.class);
                    intent.putExtra("id_materia",logro.getId_materia());
                    intent.putExtra("id_logro",logro.getId_logro());
                    intent.putExtra("descripcionLogro",logro.getDesc_logro());
                    intent.putExtra("nombreMateria",nombreMaterias.getText());
                    activity.startActivity(intent);

                }
            });


        }
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_logros, viewGroup, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder viewHolder, int position) {

        viewHolder.numeroLogro.setText("Logro "+Integer.toString(position+1));
        viewHolder.descLogro.setText(logros.get(position).getDesc_logro());
        if (logros.get(position).getNota_logro() < 0) {
            viewHolder.numeroPerido.setText("---");
        }else{
            viewHolder.numeroPerido.setText(String.valueOf(logros.get(position).getNota_logro()));
        }

        viewHolder.porcentajeLogro.setText(logros.get(position).getLogroPorcentaje()+"%");

        //viewHolder.feed = materia.get(position);
        viewHolder.logro = logros.get(position);
    }

    @Override
    public int getItemCount() {
        return logros.size();
    }


}
