package com.example.android.cokoas.AdaptersProfesor;

import android.app.Activity;
import android.support.v7.widget.RecyclerView;
import android.text.Editable;
import android.text.InputFilter;
import android.text.InputType;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.android.cokoas.AsyntaskProfesor.InsertNotaActividadAsyntask;
import com.example.android.cokoas.ModelsProfesor.EstudianteCurso;
import com.example.android.cokoas.R;
import com.example.android.cokoas.SessionManager.SessionManager;

import java.util.ArrayList;

/**
 * Created by ASUS on 13/07/2016.
 */

public class EstudianteCursoAdapters extends RecyclerView.Adapter<EstudianteCursoAdapters.ViewHolder> {
    public static ArrayList<EstudianteCurso> estudianteCursos;
    public static Activity activity;
    SessionManager sessionManager;


    public EstudianteCursoAdapters(ArrayList<EstudianteCurso> estudianteCursos, Activity activity) {
        super();
        this.estudianteCursos = estudianteCursos;
        this.activity = activity;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_estudiante_curso_profesor, viewGroup, false);

        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(final ViewHolder viewHolder, final int position) {
        viewHolder.numeroLista.setText(estudianteCursos.get(position).getNumeroLista());
        viewHolder.codigoEstudiante.setText(estudianteCursos.get(position).getCodigoEstudiante());
        viewHolder.nombreEstudiante.setText(estudianteCursos.get(position).getNombreEstudiante());

        if (TextUtils.isEmpty(estudianteCursos.get(position).getNotaEstudiante())) {
            viewHolder.notaEstudiante.setHint("---");
        } else {
            viewHolder.notaEstudiante.setText(estudianteCursos.get(position).getNotaEstudiante());
            viewHolder.notaEstudiante.setFocusable(false);
            viewHolder.notaEstudiante.setCursorVisible(false);
        }

        viewHolder.notaEstudiante.setText(estudianteCursos.get(position).getNotaEstudiante());

        viewHolder.estudianteCurso = estudianteCursos.get(position);
        viewHolder.cbSelect.setOnCheckedChangeListener(null);
        final int[] auc = {0};
/*
        viewHolder.cbSelect.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {

            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {


                if (auc[0] == 0) {
                    AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(activity);

                    alertDialogBuilder.setTitle("Calificar")
                            .setMessage("la nota es: " + viewHolder.notaEstudiante.getText().toString())
                            .setPositiveButton("OK",
                                    new DialogInterface.OnClickListener() {
                                        @Override
                                        public void onClick(DialogInterface dialog, int which) {

                                            Log.v("revisar json ", "postsf" + estudianteCursos.get(position).getIdActividad());
                                            sessionManager = new SessionManager(activity);
                                            if (sessionManager.connectionCheck(activity)) {
                                                new InsertNotaActividadAsyntask(activity).execute(estudianteCursos.get(position).getIdActividad(), viewHolder.notaEstudiante.getText().toString(), viewHolder.codigoEstudiante.getText().toString());
                                                viewHolder.notaEstudiante.setFocusable(false);
                                                viewHolder.notaEstudiante.setCursorVisible(false);
                                                viewHolder.linearLayout.setVisibility(View.GONE);
                                                viewHolder.cbSelect.setVisibility(View.GONE);
                                            } else {
                                                auc[0] = 1;
                                                viewHolder.cbSelect
                                                        .setChecked(false);
                                                auc[0] = 0;
                                                Snackbar.make(activity.findViewById(android.R.id.content), "No se pudo registrar la calificación. Comprueba la conexión de red o inténtalo de nuevo más tarde", Snackbar.LENGTH_LONG)
                                                        .setAction("", new View.OnClickListener() {
                                                            @Override
                                                            public void onClick(View view) {

                                                            }
                                                        })
                                                        .setActionTextColor(Color.YELLOW)
                                                        .show();
                                            }

                                        }
                                    })
                            .setNegativeButton("CANCELAR",
                                    new DialogInterface.OnClickListener() {
                                        @Override
                                        public void onClick(DialogInterface dialog, int which) {

                                            auc[0] = 1;
                                            viewHolder.cbSelect
                                                    .setChecked(false);
                                            auc[0] = 0;

                                        }
                                    });
                    AlertDialog alertDialog = alertDialogBuilder.create();
                    alertDialog.show();

                }


            }
        });*/

        viewHolder.notaEstudiante.setInputType(InputType.TYPE_NUMBER_FLAG_DECIMAL);
        InputFilter[] FilterArray = new InputFilter[1];
        FilterArray[0] = new InputFilter.LengthFilter(3);
        viewHolder.notaEstudiante.setFilters(FilterArray);

        viewHolder.notaEstudiante.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

                String added_number = viewHolder.notaEstudiante.getText().toString();
                if (added_number.length() != 0) {
                    try {
                        float number = Float.parseFloat(added_number);
                        if (number >= 0 && number <= 5) {
                          //  viewHolder.linearLayout.setVisibility(View.VISIBLE);
                           // viewHolder.cbSelect.setVisibility(View.VISIBLE);
                           // new InsertNotaActividadAsyntask(activity).execute(estudianteCursos.get(position).getIdActividad(), viewHolder.notaEstudiante.getText().toString(), viewHolder.codigoEstudiante.getText().toString());
                            estudianteCursos.get(position).setNotaEstudiante(added_number);
                            estudianteCursos.get(position).setNotaActividad(true);
                        } else {
                            viewHolder.notaEstudiante.setText("");
                            estudianteCursos.get(position).setNotaEstudiante("");
                            estudianteCursos.get(position).setNotaActividad(false);
                          //  viewHolder.linearLayout.setVisibility(View.GONE);
                           // viewHolder.cbSelect.setVisibility(View.GONE);
                            // Toast.makeText(getApplication(), "Not more than 5", Toast.LENGTH_SHORT).show();
                        }
                    } catch (NumberFormatException e) {
                        viewHolder.notaEstudiante.setText("");
                        estudianteCursos.get(position).setNotaActividad(false);
                    }
                }else {
                   // viewHolder.notaEstudiante.setText("");
                    estudianteCursos.get(position).setNotaEstudiante("");
                    estudianteCursos.get(position).setNotaActividad(false);
                }


            }

            @Override
            public void afterTextChanged(Editable s) {


            }
        });



    }

    @Override
    public int getItemCount() {
        return estudianteCursos.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView numeroLista, codigoEstudiante, nombreEstudiante;
        final Button buttonAgregarNotaActividad ;
        EditText notaEstudiante;
        LinearLayout linearLayout;
        public CheckBox cbSelect;
        EstudianteCurso estudianteCurso;

        public ViewHolder(View itemView) {
            super(itemView);
            numeroLista = (TextView) itemView.findViewById(R.id.id_text_lista_curso_estudiante_profesor);
            codigoEstudiante = (TextView) itemView.findViewById(R.id.id_text_codigo_estudiante_profesor);
            nombreEstudiante = (TextView) itemView.findViewById(R.id.id_text_nombre_estudiante_profesor);
            notaEstudiante = (EditText) itemView.findViewById(R.id.edit_text_nota_estudiante);
            cbSelect = (CheckBox) itemView.findViewById(R.id.cbSelect);
            linearLayout = (LinearLayout) itemView.findViewById(R.id.liner);
            buttonAgregarNotaActividad = (Button) activity.findViewById(R.id.btnAgregarNotaActividad);

            buttonAgregarNotaActividad.setVisibility(View.VISIBLE);
            buttonAgregarNotaActividad.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    final ArrayList<EstudianteCurso> estudianteCursosx = estudianteCursos;
                    new InsertNotaActividadAsyntask(activity,estudianteCursosx.get(0).getIdActividad(),estudianteCursosx.get(0).getIdCurso(),estudianteCursosx.get(0).getIdCargaDocente()).execute(estudianteCursosx);

                }
            });

        }


    }


}
